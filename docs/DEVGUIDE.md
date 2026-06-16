# Naqafin Roku Dev Guide

Naqafin is an unofficial downstream Roku client for Jellyfin-compatible media servers.

## Build

```bash
npm ci
npm run build
```

The build output is written to `out/`.

## Sideload

Enable developer mode on a Roku device, then upload the generated zip through the Roku developer web UI or with `curl`.

```bash
curl --digest -u 'rokudev:<password>' \
  -F 'mysubmit=Install' \
  -F 'archive=@out/naqafin-roku.zip;type=application/zip' \
  http://<roku-ip>/plugin_install
```

## Package

After sideloading, use the Roku developer web UI packager on the same device to create a signed `.pkg` for beta or public distribution.

## Upstream Work

Keep changes intended for the official Jellyfin Roku client in focused feature branches. Naqafin-specific branding, packaging, and store metadata should stay in this downstream repo.
