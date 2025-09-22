import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class HyperLinkButton implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _button: HTMLButtonElement;
    private _value: string;
    private _notifyOutputChanged: () => void;
    private _context: ComponentFramework.Context<IInputs>;

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._context = context;
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;

        // Create the button element
        this._button = document.createElement("button");
        this._button.className = "hyperlink-button";
        
        // Create button content with icon
        const buttonContent = document.createElement("span");
        buttonContent.className = "button-content";
        
        // Add text content
        const textSpan = document.createElement("span");
        textSpan.textContent = context.parameters.buttonLabel.raw || "Open Link";
        buttonContent.appendChild(textSpan);
        
        // Add icon
        const iconSpan = document.createElement("span");
        iconSpan.className = "external-link-icon";
        iconSpan.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7v2H5v14h14v-6h2z"/>
            <path d="M21 3h-6v2h3.586L10.293 13.293l1.414 1.414L20 6.414V10h2V3z"/>
        </svg>`;
        buttonContent.appendChild(iconSpan);
        
        this._button.appendChild(buttonContent);
        
        // Add click event handler
        this._button.addEventListener("click", this._onButtonClick.bind(this));

        // Add button styles
        const style = document.createElement("style");
        style.innerHTML = `
            .hyperlink-button {
                background-color: #0078d4;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-family: 'Segoe UI', sans-serif;
                font-size: 14px;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                min-height: 32px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .button-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .external-link-icon {
                display: inline-flex;
                align-items: center;
                transition: transform 0.2s ease;
            }
            .hyperlink-button:hover {
                background-color: #106ebe;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .hyperlink-button:hover .external-link-icon {
                transform: translateX(2px);
            }
            .hyperlink-button:active {
                background-color: #005a9e;
                box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                transform: translateY(1px);
            }
            .hyperlink-button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
                box-shadow: none;
            }
            .hyperlink-button:disabled .external-link-icon {
                opacity: 0.5;
            }
        `;

        // Add the style and button to container
        this._container.appendChild(style);
        this._container.appendChild(this._button);
    }

    private _onButtonClick(): void {
        if (this._value) {
            // Format URL if protocol is missing
            let url = this._value;
            if (!url.match(/^https?:\/\//i)) {
                url = 'https://' + url;
            }
            // Open URL in a new tab
            window.open(url, '_blank');
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._value = context.parameters.value.raw || "";
        
        // Update button content
        const textSpan = this._button.querySelector(".button-content span:first-child");
        if (textSpan) {
            textSpan.textContent = context.parameters.buttonLabel.raw || "Open Link";
        }
        
        // Update button state based on URL validity
        if (this._value) {
            this._button.disabled = false;
            this._button.title = this._value;
        } else {
            this._button.disabled = true;
            this._button.title = "No URL available";
        }
    }

    public getOutputs(): IOutputs {
        return {
            value: this._value
        };
    }

    public destroy(): void {
        this._button.removeEventListener("click", this._onButtonClick.bind(this));
    }
}
