# frozen_string_literal: true

module ApplicationHelper
  def user_json(user)
    JSON.generate(
      id: user&.id,
      email: user&.email,
      created_at: user&.created_at,
      updated_at: user&.updated_at,
    )
  end

  def flippers_json(user)
    JSON.generate(
      Flipper.features.to_h do |feature|
        if user
          [feature.name, feature.enabled?(user)]
        else
          [feature.name, feature.enabled?]
        end
      end,
    )
  end

  def git_revision
    git_revision = `git rev-parse HEAD`.strip
    git_tag = `git describe --tags --abbrev=0`.strip
    message = ""
    if git_tag.present?
      git_tag.gsub!(/^v/, "")
      message = "Version: #{git_tag} - Revision: #{git_revision[0..6]}"
    else
      message = "Revision: #{git_revision[0..6]}"
    end

    {revision:  git_revision, tag: git_tag, message: message}.to_json
  end
end
