/**
 * Analytics Property Select component.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Select, Option } from '../../../material-components';
import { STORE_NAME } from '../datastore';
import { PROPERTY_CREATE } from '../datastore/properties';
import { isValidAccountID } from '../util';

export default function PropertySelect() {
	const {
		accountID: existingTagAccountID,
		propertyID: existingTagPropertyID,
	} = useSelect( ( select ) => select( STORE_NAME ).getExistingTag() ) || {};
	const currentAccountID = useSelect( ( select ) => select( STORE_NAME ).getAccountID() );
	const accountID = existingTagAccountID || currentAccountID;
	const currentPropertyID = useSelect( ( select ) => select( STORE_NAME ).getPropertyID() );
	const propertyID = existingTagPropertyID || currentPropertyID;
	const properties = useSelect( ( select ) => select( STORE_NAME ).getProperties( accountID ) ) || [];
	const hasExistingTag = useSelect( ( select ) => select( STORE_NAME ).hasExistingTag() );

	const { setPropertyID } = useDispatch( STORE_NAME );
	const onChange = useCallback( ( index, item ) => {
		setPropertyID( item.dataset.value );
	}, [ propertyID ] );

	return (
		<Select
			className="googlesitekit-analytics__select-property"
			label={ __( 'Property', 'google-site-kit' ) }
			value={ propertyID }
			onEnhancedChange={ onChange }
			disabled={ hasExistingTag || ! isValidAccountID( accountID ) }
			enhanced
			outlined
		>
			{ properties
				.concat( ! hasExistingTag
					? {
						id: PROPERTY_CREATE,
						name: __( 'Set up a new property', 'google-site-kit' ),
					}
					: []
				)
				.map( ( { id, name }, index ) => (
					<Option
						key={ index }
						value={ id }
					>
						{ name }
					</Option>
				) ) }
		</Select>
	);
}