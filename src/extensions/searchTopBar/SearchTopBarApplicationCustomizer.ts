import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import * as microsoftTeams from "@microsoft/teams-js";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as strings from 'SearchTopBarApplicationCustomizerStrings';
import log from '../../common/log-util';
import TopPlaceholder from '../../components/top-placeholder';

const LOG_SOURCE: string = 'SearchTopBarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISearchTopBarApplicationCustomizerProperties {
  // This is an example; replace with your own property

}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SearchTopBarApplicationCustomizer
  extends BaseApplicationCustomizer<ISearchTopBarApplicationCustomizerProperties> {

  private topPlaceHolder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    log.info(LOG_SOURCE, `Initializing root component.`);

    this.context.placeholderProvider.changedEvent.add(this, this.renderPlaceHolders);

    log.info(LOG_SOURCE, `Initializing Teams Client Library...`);
    microsoftTeams.initialize(() => {
      log.info(LOG_SOURCE, `Initialized Teams Client Library...`);
      //alert();
    })
    
    return super.onInit();
  }

  private renderPlaceHolders() {
    //Log.info(LOG_SOURCE, 'Available placeholders: ' + this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    if (!this.topPlaceHolder) {
      this.topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => this.handleDispose(PlaceholderName.Top) }
      );
      if (!this.topPlaceHolder) {
        //Log.warn(LOG_SOURCE, `Placeholder not found in page: ${PlaceholderName.Top}.`);
        return;
      }

      if (this.topPlaceHolder.domElement) {
        const element: React.ReactElement = React.createElement(TopPlaceholder);
        ReactDOM.render(element, this.topPlaceHolder.domElement);
      }
    }
  }

  private handleDispose(name: PlaceholderName) {
    //Log.info(LOG_SOURCE, `Disposing component ${name} placeholder(s).`);
  }
}
