import React, { useState } from 'react';
import { defaultLocale, localeOptions } from 'Constants/defaultValue';
import { Dropdown, Avatar, Menu, Icon } from 'antd';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { appLocales } from '../../../i18n';
import { changeLocale } from 'Redux/Language/actions';
import { makeSelectLocale } from 'Redux/Language/selectors';

const SelectLanguage = props => {
  console.log(props);
  const { onLocaleToggle } = props;
  return (
    <Dropdown
      overlay={
        <Menu>
          {appLocales.map((locale, i) => (
            <Menu.Item key={i} onClick={() => onLocaleToggle(locale)}>
              {locale}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <span className="ant-dropdown-link">
        {props.locale} <Icon type="down" />
      </span>
    </Dropdown>
  );
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: locale => dispatch(changeLocale(locale)),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
