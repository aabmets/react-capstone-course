import React from 'react';
import { Fragment } from 'react';
import Description from './DescriptionTag';
import Language from './LanguageTag';
import Robots from './RobotsTag';
import TechSpecs from './TechSpecsTag';


function AllHeadTags() {
	return (
		<Fragment>
			<Description />
			<TechSpecs />
			<Robots />
			<Language />
		</Fragment>
	);
}

export default AllHeadTags;