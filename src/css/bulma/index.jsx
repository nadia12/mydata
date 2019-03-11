import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Generic from './base/generic';
import Helpers from './base/helpers';
import Breadcrumb from './components/breadcrumb';
import Card from './components/card';
import Dropdown from './components/dropdown';
import Level from './components/level';
import List from './components/list';
import Media from './components/media';
import Menu from './components/menu';
import Message from './components/message';
import Modal from './components/modal';
import Navbar from './components/navbar';
import Pagination from './components/pagination';
import Tabs from './components/tabs';
import Box from './elements/box';
import Button from './elements/button';
import Container from './elements/container';
import Content from './elements/content';
import Form from './elements/form';
import Icon from './elements/icon';
import Image from './elements/image';
import Notification from './elements/notification';
import Other from './elements/other';
import Progress from './elements/progress';
import Table from './elements/table';
import Tag from './elements/tag';
import Columns from './grid/columns';
import Tiles from './grid/tiles';
import Footer from './layout/footer';
import Hero from './layout/hero';
import Section from './layout/section';

const StyleBulma = ({
  generic, helper, breadcrumb, card,
  dropdown, level, list, media,
  menu, message, modal, navbar,
  pagination, panel, tabs, box,
  container, content, form, icon,
  image, notification, other, table,
  tag, column, tile, footer,
  hero, section, button, progress
}) => (
  <Fragment>
    { generic && <Generic /> }
    { helper && <Helpers /> }
    { breadcrumb && <Breadcrumb /> }
    { card && <Card /> }
    { dropdown && <Dropdown /> }
    { level && <Level /> }
    { list && <List /> }
    { media && <Media /> }
    { menu && <Menu /> }
    { message && <Message /> }
    { modal && <Modal /> }
    { navbar && <Navbar /> }
    { pagination && <Pagination /> }
    { tabs && <Tabs /> }
    { box && <Box /> }
    { container && <Container /> }
    { content && <Content /> }
    { form && <Form /> }
    { icon && <Icon /> }
    { image && <Image /> }
    { notification && <Notification /> }
    { other && <Other /> }
    { table && <Table /> }
    { tag && <Tag /> }
    { column && <Columns /> }
    { tile && <Tiles /> }
    { footer && <Footer /> }
    { hero && <Hero /> }
    { section && <Section /> }
    { button && <Button /> }
    { progress && <Progress /> }
  </Fragment>
);

StyleBulma.propTypes = {
  generic: PropTypes.bool,
  helper: PropTypes.bool,
  breadcrumb: PropTypes.bool,
  card: PropTypes.bool,
  dropdown: PropTypes.bool,
  level: PropTypes.bool,
  list: PropTypes.bool,
  media: PropTypes.bool,
  menu: PropTypes.bool,
  message: PropTypes.bool,
  modal: PropTypes.bool,
  navbar: PropTypes.bool,
  pagination: PropTypes.bool,
  tabs: PropTypes.bool,
  box: PropTypes.bool,
  container: PropTypes.bool,
  content: PropTypes.bool,
  form: PropTypes.bool,
  icon: PropTypes.bool,
  image: PropTypes.bool,
  notification: PropTypes.bool,
  other: PropTypes.bool,
  table: PropTypes.bool,
  tag: PropTypes.bool,
  column: PropTypes.bool,
  tile: PropTypes.bool,
  footer: PropTypes.bool,
  hero: PropTypes.bool,
  section: PropTypes.bool,
  button: PropTypes.bool,
  progress: PropTypes.bool
};

StyleBulma.defaultProps = {
  generic: false,
  helper: false,
  breadcrumb: false,
  card: false,
  dropdown: false,
  level: false,
  list: false,
  media: false,
  menu: false,
  message: false,
  modal: false,
  navbar: false,
  pagination: false,
  tabs: false,
  box: false,
  container: false,
  content: false,
  form: false,
  icon: false,
  image: false,
  notification: false,
  other: false,
  table: false,
  tag: false,
  column: false,
  tile: false,
  footer: false,
  hero: false,
  section: false,
  button: false,
  progress: false
};

export default StyleBulma;
