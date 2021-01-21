import { Component } from '@wordpress/element';

export default class Save extends Component {
	render() {
		const {
			attributes: { events },
		} = this.props;
		const timelineChildren = events.map( ( eventElement ) => {
			const { event, description } = eventElement;
			return `<VerticalTimelineElement
                    date="${ event }"
                >
                    <h3>${ description }</h3>
                </VerticalTimelineElement>`;
		} );

		return wp.element.RawHTML( {
			children: `
                <VerticalTimeline>
                    ${ timelineChildren.join( '' ) }
                </VerticalTimeline> `,
		} );
	}
}
