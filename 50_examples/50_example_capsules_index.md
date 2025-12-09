# Example Capsules (v0.0.0 seed set)

Use these as canonical examples for structure, deep-links, and graph edges.

## Flagship tour
- `tour-lake-ritsa-winter` (slug `lake-ritsa-winter`)
  - Contains places: `gagra`, `blue-lake`, `lake-ritsa`.

## Places
- `place-gagra` (slug `gagra`)
  - part_of: `lake-ritsa-winter`
  - nearby: `blue-lake`
- `place-blue-lake` (slug `blue-lake`)
  - part_of: `lake-ritsa-winter`
  - nearby: `gagra`, `lake-ritsa` (optional)
- `place-lake-ritsa` (slug `lake-ritsa`)
  - part_of: `lake-ritsa-winter`
  - nearby: `blue-lake`

## Deep-link tokens in copy
- The tour body references `[[gagra]]`, `[[blue-lake]]`, `[[lake-ritsa]]`.
- Place bodies can reference `[[lake-ritsa-winter]]` where relevant.
