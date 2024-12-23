import * as React from 'react';

import { Editor } from '@tinymce/tinymce-react';

// Models
import { Editor as TinyMCEEditor } from 'tinymce';
import { IPersonalizationTag, ITextEditorComponentProps } from './model';

const defaultPlugins = [
	'lists advlist',
	'anchor',
	'autolink',
	'autoresize',
	'charmap',
	'code codesample',
	'directionality',
	'emoticons',
	'fullscreen',
	'help',
	'hr',
	'image imagetools',
	'insertdatetime',
	'link',
	'nonbreaking',
	'paste',
	'preview',
	'print',
	'quickbars',
	'searchreplace',
	'table',
	'toc',
	'visualblocks',
	'wordcount'
];

const defaultToolbar = `
	newdocument |
  undo redo |
  cut copy paste pastetext |
  link unlink openlink anchor |
  numlist bullist |
  outdent indent |
  blockquote |
  alignleft alignright aligncenter alignjustify |
  bold italic strikethrough underline removeformat |
  formatselect |
  fontselect fontsizeselect forecolor backcolor |
  visualblocks |
  code |`;

/**
 * TextEditor
 */
export const TextEditor: React.FC<ITextEditorComponentProps> = ({
	disabled = false,
	init = {},
	inline = false,
	menubar = false,
	plugins = defaultPlugins,
	toolbar = defaultToolbar,
	...props
}) => {
	const getSetup = (editor) => {
		props.personalizationTags &&
			editor.ui.registry.addMenuButton(props.personalizationTags.id, {
				fetch: (callback) => {
					const items: any =
						props.personalizationTags &&
						props.personalizationTags.tags.map((item: IPersonalizationTag) => {
							return {
								onAction: () => {
									editor.insertContent(item.value);
								},
								text: item.label,
								type: 'menuitem'
							};
						});
					callback(items);
				},
				text: props.personalizationTags.buttonLabel
			});
	};

	const getToolbar = () => {
		if (props.personalizationTags) {
			return `${toolbar} | ${props.personalizationTags.id}`;
		}
		return toolbar;
	};

	return (
		<Editor
			disabled={disabled}
			inline={inline}
			menubar={menubar}
			plugins={plugins}
			toolbar={getToolbar()}
			{...props}
			onInit={(_evt, editor) => props.onInit?.(editor)}
			init={{ setup: props.personalizationTags ? getSetup : undefined, ...init, menubar, selector: props.selector }}
		/>
	);
};

TextEditor.displayName = 'TextEditor';
