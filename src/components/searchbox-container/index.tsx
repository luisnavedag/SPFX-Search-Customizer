import { SearchBox } from 'office-ui-fabric-react';
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import styles from '../components.module.scss';

const LOG_SOURCE = "SearchBoxContainer";

export interface ISearchBoxContainerState {
    searchText: string;
}

export interface ISearchBoxContainerProps  {
    placeholder: string;
    inputValue?: string;
}

export default class SearchBoxContainer extends React.Component<ISearchBoxContainerProps, ISearchBoxContainerState> {
    constructor(props) {
        super(props);

        this.state = {
            searchText: (this.props.inputValue) ? decodeURIComponent(this.props.inputValue) : ""
        };

        this.handleOnSearch = this.handleOnSearch.bind(this);
    }

    public render() {
        return (
            <div className={styles.searchContainer}>
                <SearchBox 
                    placeholder={this.props.placeholder} 
                    onChange={(event) => {this.setState({searchText:(event && event.currentTarget) ? event.currentTarget.value : ""});}} 
                    onSearch={() => this.handleOnSearch(this.state.searchText)}
                    value={this.state.searchText} />
            </div>
        );
    }

    private handleOnSearch(v: string) {
        console.info(`Currently searching for "${v}"`);
        const url = `/_layouts/15/search.aspx?q=${v}&v=search`;
        window.location.href = (url);
    }
}