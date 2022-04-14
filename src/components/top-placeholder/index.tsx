import * as React from 'react';
import * as log from '../../common/log-util';
import styles from '../components.module.scss';
import SearchBoxContainer from '../searchbox-container';

const LOG_MODULE_NAME = "TopPlaceholder";
const SEARCH_BOX_PLACEHOLDER = "Search in SharePoint Online";

export interface ITopPlaceholderProps {

}

export default class TopPlaceholder extends React.Component<ITopPlaceholderProps> {

    constructor(props) {
        super(props);

        log.info(LOG_MODULE_NAME, `constructor()`, props);
    }

    public render() {
        return (
            <div className={styles.placeholder}>
                <SearchBoxContainer placeholder={SEARCH_BOX_PLACEHOLDER} />
            </div>
        );
    }
}