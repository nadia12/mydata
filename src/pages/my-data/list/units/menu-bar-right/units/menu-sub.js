import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDropRight } from 'volantis-icon';

// import { ArrowRightIcon } from '../elements/icons';

export default class MenuSub extends React.PureComponent {
  static propTypes   = {
    menus: PropTypes.array.isRequired,
    handleChangeMenu: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="vertical">
        <style jsx>{
          `
            .bottom-border {  
              border-bottom: 2px solid #262831;
              outline: 0;
            }

            .nested-ul-list-item{
              left: 17em !important;
              max-height: 200px;
              top: -10.7em !important;
              }

            .vertical{
              width: 15rem;
              position: absolute;
              margin-left: 8rem;
              margin-top: 19vh;
              z-index: 10;
            }

            .ul-list-item {
              background-color: #313440;
              border-radius: 4px;
              border: 1px solid #1b1c21;
            }

            ul {
              list-style-type: none;
              padding: 0;
            }

            li {
              list-style-type: none;
              position: relative;
            }

            .div-item {
              text-decoration: none;
              color: #9ea1b4;
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 0.25px;
              background-color: #313440;
              padding:0 15px 0 15px;
              transition:0.2s;
              display: flex;
              align-items: center;
              cursor: pointer;
            }

            .div-item.disable {
              cursor: not-allowed;
            }

            ul ul {
              position:absolute;
              left:0%;
              top:0;
              width:100%;
              border: 1px solid black;
              border-radius: 4px;
              visibility:hidden; 
              opacity:0; 
              transition: transform 0.2s;
              transform: translateX(50px);
            }

            li:hover > ul {
              left:100%;
              visibility:visible;
              opacity:1;
              transform: translateX(0px);
              background:#313440;
              overflow-y: scroll;
              overflow-x: hidden;
              height: 12rem;
            }

            p {
              display: inline;
              padding-left: 10px;
            }

            .arrow {
              position: relative;
              margin-left: auto;
            }

            .li-list-item:hover > .div-item {
              background-color: #ffd77b;
              color: rgba(0, 0, 0, 0.87);
            }

            .li-list-item:hover > .div-item > :global(svg > g > g > path), .li-list-item:hover > .div-item > .arrow > :global(svg > g > g > polygon) {
              fill: #1b1c21;
            }

            .li-list-item:hover > .div-item > :global(svg path) {
              fill: #1b1c21;
              background: red;
            }

            .li-list-item:first-child:hover > .div-item, .li-list-item:first-child > .div-item {
              border-radius: 4px 4px 0 0;
            }

            .li-list-item:last-child:hover > .div-item, .li-list-item:last-child > .div-item{
              border-radius: 0 0 4px 4px;
            }

            div:first-child > li:first-child:hover >a, .nested-ul-list-item > .li-list-item:first-child:hover > .div-item {
              border-radius: 4px 4px 0 0;
            }

            div:last-child > li:last-child:hover >a, .nested-ul-list-item > .li-list-item:last-child:hover > .div-item {
              border-radius: 0 0 4px 4px;
            }

            .menu-name {
              padding-left: 1em;
            }
          `
        }
        </style>
        <ul className="ul-list-item">
          {
            !!this.props.menus && this.props.menus.length > 0 && this.props.menus.map((menu, idx) => {
              return !!menu && !!menu.name ?
                (
                  <li key={idx} className={`li-list-item ${menu.hasBottom ? 'bottom-border' : ''}` }>
                    <div role="button" className={`div-item${menu.disable ? ' disable' : ''}`} onClick={() => this.props.handleChangeMenu(menu.menu) }>
                      {menu.icon}
                      <p className="menu-name">{menu.name}</p>
                      { menu.child.length > 0 && (<div className="arrow"><ArrowDropRight /></div>)}
                    </div>
                    {
                      menu.child.length > 0 &&
                      (
                        <ul className="nested-ul-list-item">
                          {
                            menu.child.map((child, idx2) => (
                              <li key={idx2} className={`li-list-item ${child.hasBottom ? 'bottom-border' : ''}` }>
                                <div role="button" className="div-item" onClick={() => this.props.handleChangeMenu(child.menu, child.value) }>
                                  {child.icon}
                                  <p className="menu-name">{child.name}</p>
                                </div>
                              </li>
                            ))
                          }
                        </ul>
                      )
                    }
                  </li>
                ) : null;
            })
          }
        </ul>
      </div>
    );
  }
}
