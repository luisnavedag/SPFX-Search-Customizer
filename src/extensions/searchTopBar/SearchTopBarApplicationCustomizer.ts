import * as microsoftTeams from '@microsoft/teams-js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'SearchTopBarApplicationCustomizerStrings';
import * as log from '../../common/log-util';
import TopPlaceholder from '../../components/top-placeholder';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';

const LOG_MODULE_NAME: string = 'SearchTopBarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISearchTopBarApplicationCustomizerProperties {
    placeholderText: string;
    logLevel: log.LogLevel;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SearchTopBarApplicationCustomizer
  extends BaseApplicationCustomizer<ISearchTopBarApplicationCustomizerProperties> {

  private topPlaceHolder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    log.info(`${LOG_MODULE_NAME} -> onInit()`, `Properties recieved from SharePoint`, this.properties, this.properties.logLevel);

    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);
    
    return super.onInit();
  }

  private renderPlaceHolders() {

    log.info(`${LOG_MODULE_NAME} -> renderPlaceHolders()`, "Available placeholders", this.getPlaceholderNames(), this.properties.logLevel);

    if (!this.topPlaceHolder) {
      this.topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => this.handleDispose(PlaceholderName.Top) }
      );
      if (!this.topPlaceHolder) {
        log.warn(`${LOG_MODULE_NAME} -> renderPlaceHolders()`, `Placeholder not found in page: ${PlaceholderName.Top}.`, "");
        return;
      }

      if (this.topPlaceHolder.domElement) {
        const element: React.ReactElement = React.createElement(TopPlaceholder, this.properties);
        ReactDOM.render(element, this.topPlaceHolder.domElement);
      }
    }
  }

  private handleDispose(name: PlaceholderName) {
    log.info(`${LOG_MODULE_NAME} -> handleDispose()`, `Disposing component ${name} placeholder(s).`, "");
  }

  private getPlaceholderNames() {
    if (this.context.placeholderProvider) {
      if( this.context.placeholderProvider.placeholderNames) {
        return this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]);
      }
    }
  }
}
