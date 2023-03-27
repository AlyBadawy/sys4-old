# frozen_string_literal: true

class PaperTrailDiffer
  def diff(changes)
    result = {}
    changes.each do |field, value|
      result[field] = Hashdiff.diff(value[0], value[1], array_path: true, use_lcs: false)
    end
    result
  end

  def where_object_changes(model, attributes)
    scope = model
    attributes.each do |key, value|
      scope =
        model.where(
          "(((object_changes -> ?)::jsonb ->> 0)::jsonb @> ?)",
          key.to_s,
          value.to_s
        )
    end
    scope
  end

  def load_changeset(version)
    version.object_changes.with_indifferent_acess
  end
end

PaperTrail.config.object_changes_adapter = PaperTrailDiffer.new
