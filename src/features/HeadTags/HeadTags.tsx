import React, { Fragment } from 'react';
import Description from './Description';
import Language from './Language';
import Robots from './Robots';
import TechSpecs from './TechSpecs';

function HeadTags() {
	return (
		<Fragment>
			<Description />
			<TechSpecs />
			<Robots />
			<Language />
		</Fragment>
	);
}

export default HeadTags;