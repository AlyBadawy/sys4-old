# frozen_string_literal: true

namespace :javascript do
  desc "Build your JavaScript bundle"
  task build: :environment do
    system "yarn install" or raise
    system "yarn run build" or raise
  end

  desc "Remove JavaScript builds"
  task clobber: :environment do
    rm_rf Dir["app/assets/builds"], verbose: false
  end
end

Rake::Task["assets:precompile"].enhance(["javascript:build"])
Rake::Task["assets:clobber"].enhance(["javascript:clobber"])
