import * as React from 'react';
import { Log } from '@microsoft/sp-core-library';
import styles from '../components.module.scss';
import SearchBoxContainer from '../searchbox-container';

const LOG_SOURCE = "TopPlaceholder";
const SEARCH_BOX_PLACEHOLDER = "Search in SharePoint Online"

export interface ITopPlaceholderProps {

}

export default class TopPlaceholder extends React.Component<ITopPlaceholderProps> {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className={styles.placeholder}>
                <SearchBoxContainer placeholder={SEARCH_BOX_PLACEHOLDER} />
            </div>
        );
    }
}