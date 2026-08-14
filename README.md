# HiddenText

Hide text messages and HTTPS destinations beneath ordinary-looking Unicode text.

**Live site:** https://netrino23.github.io/hiddentext/

[Try HiddenText](https://netrino23.github.io/hiddentext/) · [⭐ Star the project](https://github.com/netrino23/hiddentext) · [MIT License](LICENSE)

HiddenText is an experimental, client-side steganography tool. It embeds UTF-8 content and compact format metadata into Unicode Variation Selectors that normally have no visible rendering of their own. The visible cover text remains readable while a hidden text message or HTTPS destination travels with an exact digital copy.

## Features

- Typed v3 posts for hidden text messages and HTTPS links
- Single-card morphing decoder with scan, dissolve, and in-place reveal effects
- Reduced-motion support for the decoder transition
- High-tech link reveal button with no visible destination text
- HTTPS-only validation and deliberate new-tab opening
- Clean posts with no visible JSON or technical header
- Optional browser-native deflate compression
- Compact public-seed obfuscation
- CRC32 integrity checking for uncompressed payloads
- X weighted-length estimate
- Mobile-friendly copy, paste, selection, and share controls
- Installable Progressive Web App with offline encoder and decoder
- Android/compatible-platform share target for sending text to the decoder
- Home-screen shortcuts for Encode and Reveal
- Legacy v1 and v2 text decoding support
- No accounts, uploads, database, or server-side message storage

## Use it

1. Open the [Encoder](https://netrino23.github.io/hiddentext/encoder.html).
2. Enter visible cover text, a public seed, and choose **Text message** or **HTTPS link**.
3. Copy the generated post exactly.
4. Paste an exact digital copy into the [Decoder](https://netrino23.github.io/hiddentext/decoder.html). The input dissolves in place: text is revealed inside the same card, while a hidden link becomes a launch button and opens only after a deliberate tap.

## Repository structure

- `index.html` — public landing page
- `encoder.html` — creates typed v3 HiddenText posts
- `decoder.html` — reveals v3 posts and legacy v1/v2 text posts
- `manifest.webmanifest` — PWA identity, icons, shortcuts, and share target
- `pwa.js` — installation flow and service-worker registration
- `service-worker.js` — offline application-shell cache
- `icons/` — scalable and platform-sized application icons
- `LICENSE` — MIT open-source license

The encoder and decoder keep their core logic inline and use no third-party JavaScript dependencies. The small local `pwa.js` file only manages installation and service-worker registration.

## Install the app

Open the live site and choose **Install app**. On supported Chromium browsers this opens the native browser installation prompt. On iPhone and iPad, use Safari’s **Share → Add to Home Screen** action. Once installed, the core HiddenText pages are cached for offline use.

When an installed platform supports Web Share Target and another app shares actual text, HiddenText can receive that text directly in the Reveal page. Apps that share only a link still require copying the complete post text so that the invisible Unicode layer is preserved.

## Compact v3 envelope

The invisible byte envelope contains:

1. Four-byte magic signature: `HTX3`
2. Payload mode byte
3. Content-type byte (`text` or `link`)
4. Public-seed byte length
5. Two-byte payload length
6. UTF-8 public seed
7. Seed-obscured payload

The v3 signature is `HTX3`. Bytes are mapped to the 256 Unicode Variation Selectors. The decoder scans the copied text for the v3 signature, reads the envelope and content type, reverses the public-seed transformation, decompresses when required, and decodes the original UTF-8 content. It retains separate parsers for older `HTX2` posts and legacy v1 JSON-header posts.

Hidden links must parse as complete `https://` URLs and may not contain embedded usernames or passwords. The decoder never navigates automatically. It validates the recovered destination and exposes it only through a fixed **Open hidden link** control with `target="_blank"` and `rel="noopener noreferrer"`. The URL is not rendered as page text, although the destination naturally becomes visible in the browser address bar after it opens.

## Important limitations

HiddenText is **not encryption**. The seed and format are public, and anyone with a compatible decoder can reveal the message.

The payload may be lost when text is:

- retyped manually
- captured as a screenshot or by OCR
- normalized or sanitized
- copied through software that strips Variation Selectors
- posted to a platform that rejects or removes unsupported Unicode sequences

Never use HiddenText to protect passwords, financial information, private keys, personal data, or other sensitive material.

## Run locally

Download the repository and open `index.html` in a modern browser. Clipboard permissions are more reliable when the site is served over HTTPS, such as through GitHub Pages.

## Acknowledgement

The byte-to-Variation-Selector technique was publicly explored in Paul Butler's article [“Smuggling arbitrary data through an emoji”](https://paulbutler.org/2025/smuggling-arbitrary-data-through-an-emoji/). HiddenText adds a compact typed v3 envelope, compression selection, public-seed transformation, length metadata, integrity checking, X length estimation, HTTPS link handling, and legacy format support.

## Project status

Experimental proof of concept. Platform compatibility may change as text processors and social networks update their Unicode handling.

## Support the project

If HiddenText surprised you, give the repository a ⭐, share the live demo, report compatibility results, or propose an improvement through an issue or pull request.

## License

HiddenText is released under the [MIT License](LICENSE).
