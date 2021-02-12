import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';

const Loading = props => (
  <Panel id={props.id}>
    <Header>MaslenitsaWheel</Header>
    <Div>
      <Progress value={props.progress} />
    </Div>
  </Panel>
);

Loading.propTypes = {
	id: PropTypes.string.isRequired,
	//value: PropTypes.number.isRequired,
};

export default Loading;
