/**
 * Analytics Account Select component.
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
import { ACCOUNT_CREATE } from '../datastore/accounts';

export default function AccountSelect() {
	const accounts = useSelect( ( select ) => select( STORE_NAME ).getAccounts() ) || [];
	const accountID = useSelect( ( select ) => select( STORE_NAME ).getAccountID() );
	const hasExistingTag = useSelect( ( select ) => select( STORE_NAME ).hasExistingTag() );
	const { accountID: existingTagAccountID } = useSelect( ( select ) => select( STORE_NAME ).getExistingTag() ) || {};

	const { setAccountID } = useDispatch( STORE_NAME );
	const onChange = useCallback( ( index, item ) => {
		setAccountID( item.dataset.value );
	}, [ accountID ] );

	return (
		<Select
			className="googlesitekit-analytics__select-account"
			enhanced
			name="accounts"
			value={ existingTagAccountID || accountID }
			onEnhancedChange={ onChange }
			label={ __( 'Account', 'google-site-kit' ) }
			disabled={ hasExistingTag }
			outlined
		>
			{ accounts
				.concat( ! hasExistingTag
					? {
						id: ACCOUNT_CREATE,
						name: __( 'Set up a new account', 'google-site-kit' ),
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