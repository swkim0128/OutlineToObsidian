import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface OutlineSyncSettings {
	apiUrl: string;
	personalToken: string;
}

const DEFAULT_SETTINGS: OutlineSyncSettings = {
	apiUrl: '',
	personalToken: ''
}

export default class OutlineSyncPlugin extends Plugin {
	settings: OutlineSyncSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Outline Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
		});

		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		this.addSettingTab(new OutlineSyncSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class OutlineSyncSettingTab extends PluginSettingTab {
	plugin: OutlineSyncPlugin;

    constructor(app: App, plugin: OutlineSyncPlugin) {
	    super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('API URL')
			.setDesc('Outline API의 URL을 입력하세요')
			.addText(text => text
			.setValue(this.plugin.settings.apiUrl)
			.onChange(async (value) => {
				this.plugin.settings.apiUrl = value;
				await this.plugin.saveSettings();
			}));
	}
}
																							
