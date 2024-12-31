{
  "dryRun": "full",
  "username": "renovate-release",
  "gitAuthor": "Renovate Bot <bot@renovateapp.com>",
  "onboarding": false,
  "platform": "github",
  "forkProcessing": "enabled",
  "repositories": ['react-sample'],
  "packageRules": [
    {
      "description": "lockFileMaintenance",
      "matchUpdateTypes": [
        "pin",
        "digest",
        "patch",
        "minor",
        "major",
        "lockFileMaintenance"
      ],
      "dependencyDashboardApproval": false,
      "minimumReleaseAge": 0
    }
  ]
}
