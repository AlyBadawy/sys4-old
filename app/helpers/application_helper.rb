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
end
