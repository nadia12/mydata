import React from 'react';
import PropTypes from 'prop-types';
// import { StylePageLayout } from '../css';
// import { colors } from 'Config/constant';
// import { Sidebar } from 'UI/components';
import { SearchIcon } from 'volantis-icon';
import { Breadcrumb } from 'volantis-ui';

export default class SidebarContentLayout extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string.isRequired,
    handleAddNewData: PropTypes.func,
    handleSearchChange: PropTypes.func,
    handleSearchList: PropTypes.func,
    renderTopAction: PropTypes.func,
    handleBreadcrumbChange: PropTypes.func,
    search: PropTypes.string,
    pathname: PropTypes.string,
    breadcrumbList: PropTypes.array,
    isSearchAble: PropTypes.bool,
    isAddAble: PropTypes.bool,
    addButtonTitle: PropTypes.string
  }
  static defaultProps = {
    children: null,
    handleAddNewData: () => {},
    handleSearchList: () => {},
    handleSearchChange: () => {},
    renderTopAction: () => {},
    handleBreadcrumbChange: () => {},
    search: '',
    breadcrumbList: [],
    isSearchAble: true,
    isAddAble: true,
    addButtonTitle: 'Add New',
    pathname: '/my-data'
  }

  render() {
    const { breadcrumbList, handleBreadcrumbChange } = this.props;
    return (
      <React.Fragment>
        {/* <StylePageLayout sidebarContentLayout /> */}
        <Sidebar pathname={this.props.pathname} />
        <section className="hero is-fullheight main-content">
          <div className="hero-head">
            <div className="columns m0">
              <div className="column main-content-head">
                <div className="columns m0">
                  <div className="column p0 has-text-24 has-text-gold has-text-weight-500">
                    <Breadcrumb
                      breadcrumbList={breadcrumbList}
                      handleBreadcrumbChange={ handleBreadcrumbChange }
                    />
                  </div>
                </div>
                <div className="columns m0 mt48px">
                  <div className="column p0">{
                    this.props.isAddAble && this.props.handleAddNewData && (
                      <button
                        className="button is-outlined is-gold is-standard has-icon has-border-radius-18px"
                        onClick={this.props.handleAddNewData}
                      >
                        <span className="button-icon">+</span>
                        <span className="button-text">{this.props.addButtonTitle}</span>
                      </button>
                    )
                  }
                  </div>
                  <div className="column has-flex-right p0">
                    <div className="field is-grouped">
                      <div className="mt0 has-flex-right btn-top-action">
                        {
                          this.props.renderTopAction()
                        }
                      </div>
                      {this.props.isSearchAble  && (
                        <React.Fragment>
                          <button className="top-search-icon icon is-left is-standard" onClick={this.props.handleSearchList}>
                            <SearchIcon size={24} color={colors.gold} />
                          </button>
                          <p className="control has-icons-left mt0 search-field">
                            <input
                              className="input is-standard is-gray-light is-search-top-table"
                              type="text"
                              placeholder="Search"
                              onChange={(e) => this.props.handleSearchChange(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' ? this.props.handleSearchList() : null }
                              value={this.props.search}
                            />
                          </p>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.children}
        </section>
      </React.Fragment>
    );
  }
}
