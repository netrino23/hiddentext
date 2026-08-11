# HiddenText

Hide and reveal invisible Unicode messages beneath ordinary text.

**Live site:** https://netrino23.github.io/hiddentext/

[Try HiddenText](https://netrino23.github.io/hiddentext/) · [⭐ Star the project](https://github.com/netrino23/hiddentext) · [MIT License](LICENSE)

HiddenText is an experimental, client-side steganography tool. It embeds a UTF-8 message and compact format metadata into Unicode Variation Selectors that normally have no visible rendering of their own. The visible cover text remains readable while the hidden payload travels with an exact digital copy.

## Features

- Clean v2 posts with no visible JSON or technical header
- Optional browser-native deflate compression
- Compact public-seed obfuscation
- CRC32 integrity checking for uncompressed payloads
- X weighted-length estimate
- Mobile-friendly copy, paste, selection, and share controls
- Legacy v1 decoding support
- No accounts, uploads, database, or server-side message storage

## Use it

1. Open the [Encoder](https://netrino23.github.io/hiddentext/encoder.html).
2. Enter visible cover text, a public seed, and a hidden message.
3. Copy the generated post exactly.
4. Paste an exact digital copy into the [Decoder](https://netrino23.github.io/hiddentext/decoder.html).

## Repository structure

- `index.html` — public landing page
- `encoder.html` — creates v2 HiddenText posts
- `decoder.html` — reveals v2 posts and legacy v1 posts
- `LICENSE` — MIT open-source license

Each page is standalone and uses no external JavaScript dependencies.

## Compact v2 envelope

The invisible byte envelope contains:

1. Four-byte magic signature: `HTX2`
2. Payload mode byte
3. Public-seed byte length
4. Two-byte payload length
5. UTF-8 public seed
6. Seed-obscured payload

Bytes are mapped to the 256 Unicode Variation Selectors. The decoder scans the copied text for the v2 signature, reads the envelope length, reverses the public-seed transformation, decompresses when required, and decodes the original UTF-8 message.

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

The byte-to-Variation-Selector technique was publicly explored in Paul Butler's article [“Smuggling arbitrary data through an emoji”](https://paulbutler.org/2025/smuggling-arbitrary-data-through-an-emoji/). HiddenText adds a compact invisible v2 envelope, compression selection, public-seed transformation, length metadata, integrity checking, X length estimation, and legacy format support.

## Project status

Experimental proof of concept. Platform compatibility may change as text processors and social networks update their Unicode handling.

## Support the project

If HiddenText surprised you, give the repository a ⭐, share the live demo, report compatibility results, or propose an improvement through an issue or pull request.

## License

HiddenText is released under the [MIT License](LICENSE).
