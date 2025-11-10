import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { PropertiesQuery, PropertiesQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';


type Props = {
	variables: PropertiesQueryVariables;
	data: PropertiesQuery;
	query: string;
}

export default function AdminPropertyPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const property = data.properties;

	return (
		<article>
			<div data-tina-field={tinaField(property, "gallery_image_urls")} className="hero-image">
				{property.gallery_image_urls && <img width={1020} height={510} src={property.gallery_image_urls[0]} alt="" />}
			</div>
			<div className="prose">
				<div className="title">
					<div className="date" data-tina-field={tinaField(property, "possession_date")} >
						<FormattedDate date={property.possession_date} />
					</div>
					<h1 data-tina-field={tinaField(property, "project_name")} >{property.project_name}</h1>
					<hr />
				</div>
				<div data-tina-field={tinaField(property, "body")}>
					<TinaMarkdown content={property.body} />
				</div>
			</div>
		</article>
	);
}
