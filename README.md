<p align="center"><img src="images/naqafin-poster.png" alt="Naqafin for Roku" style="border: 1px solid #222; border-radius: 4px" /></p>

# Naqafin for Roku

Naqafin is an unofficial Roku client for Jellyfin-compatible media servers.

This project is forked from the official [Jellyfin Roku client](https://github.com/jellyfin/jellyfin-roku), but it is not affiliated with, endorsed by, or sponsored by the Jellyfin project or Roku. It exists as a personal downstream build while experimental client features are developed and tested.

Naqafin does not provide media content. It connects to a Jellyfin server that you configure.

## Differences From Jellyfin Roku

Naqafin currently includes these changes relative to the official Jellyfin Roku client:

- Playlist Up Next support: adds a home row for continuing playback from configured playlists.
- Server-generated caption playback support: adds client support for requesting and playing generated subtitle tracks from a compatible Jellyfin server plugin.
- Naqafin branding and Roku packaging metadata for private beta distribution.

The feature changes are maintained separately so they can be proposed upstream as focused pull requests.

## Companion Server Plugins

Naqafin's additional Roku features currently depend on companion Jellyfin server plugins:

- [Jellyfin Plugin Playlist Up Next](https://github.com/naqadata/jellyfin-plugin-playlist-up-next): exposes playlist-ordered resume candidates for the `Playlist Up Next` home row.
- [Jellyfin Plugin Auto Generate Captions](https://github.com/naqadata/jellyfin-plugin-auto-generate-captions): provides the generated-caption session API and live WebVTT endpoint used by Naqafin's `Auto-Generated` subtitle option.

These plugins are designed to work with Naqafin. Stock Jellyfin clients do not currently support these plugin-specific client workflows.

## Optional Caption Worker

Generated captions can run entirely on the Jellyfin server through the Auto Generate Captions plugin. For better accuracy or throughput on a stronger GPU host, deploy [Naqafin Caption Worker](https://github.com/naqadata/naqafin-caption-worker) and configure the Jellyfin plugin to use it as a remote worker.

Naqafin does not talk to the worker directly. The flow is:

```text
Naqafin Roku -> Jellyfin Auto Generate Captions plugin -> optional Naqafin Caption Worker
```

## Status

This is a personal/private beta build. Expect rough edges, force-pushed experiments, and changes that are useful for testing before they are polished enough for upstream review.

For the official Jellyfin Roku client, use the upstream project:

- Source: <https://github.com/jellyfin/jellyfin-roku>
- Roku Channel Store: <https://channelstore.roku.com/>

## Building

Install dependencies and build the Roku package:

```bash
npm ci
npm run build
```

The build output is written to `out/`.

## Development

Most client development should happen in the focused Jellyfin Roku feature branches first. Naqafin then merges those branches and adds downstream-only branding/package changes.

Downstream-only changes should stay in this repo, including:

- Naqafin app name and artwork
- Roku beta/public package settings
- Store listing, policy, and support metadata
- Temporary compatibility tweaks for Naqafin distribution

## License

Naqafin is distributed under the same GPL-2.0 license as the upstream Jellyfin Roku client. See [LICENSE](LICENSE).

Jellyfin is a trademark of the Jellyfin project. Roku is a trademark of Roku, Inc. This project is unofficial and independent.
