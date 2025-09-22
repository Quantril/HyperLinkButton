# HyperLink Button PCF Control

A Power Apps Component Framework (PCF) control that transforms URL fields into professional-looking buttons with enhanced user experience. Replace your SingleLine.URL field with a clickable button.

## Features

- Converts URL fields into modern, styled buttons
- Customizable button label text
- External link icon indicator
- Smooth hover and click animations
- Automatic URL protocol handling (adds https:// if missing)
- Tooltip showing full URL on hover
- Opens links in new tab
- Disabled state handling for empty URLs

## Installation

1. Download the latest release (unmanaged solution)
2. Import the solution into your Dynamics 365 environment
3. Add to any Single Line of Text field with Format = "URL"

## Configuration

When adding the control to a form, configure:

1. **URL Field Binding**: Bind to your URL field
2. **Button Label**: Set custom text for the button (e.g., "Visit Website", "Open Document")

## Development Setup

1. Install prerequisites:
   ```bash
   npm install -g pac-cli
   ```

2. Clone the repository:
   ```bash
   git clone [repository-url]
   cd HyperLinkButton
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the control:
   ```bash
   npm run build
   ```

5. Test locally:
   ```bash
   npm start watch
   ```

## Deployment

To deploy to your environment:

1. Build the solution:
   ```bash
   npm run build
   msbuild /t:restore
   msbuild
   ```

2. Find the generated solution file in:
   ```
   bin\Debug\
   ```

3. Import the solution into your Dynamics 365 environment

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT License](LICENSE)
