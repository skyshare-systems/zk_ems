// // types/editor.ts

// export interface EditorBlock {
//   id: string;
//   type: string;
//   data: {
//     text?: string;
//     level?: number;
//     style?: string;
//     items?: string[];
//     content?: string[];
//     [key: string]: any;
//   };
// }

// export interface EditorData {
//   time: number;
//   blocks: EditorBlock[];
//   version: string;
// }

// // hooks/useEditor.ts
// import { useCallback, useRef, useState, useEffect } from 'react';
// import EditorJS, { OutputData } from '@editorjs/editorjs';
// import { useCreateEmailStore } from '@/store/create-email';

// const EDITOR_JS_TOOLS = {
//   paragraph: {
//     config: {
//       placeholder: 'Start typing...'
//     }
//   },
//   header: {
//     class: await import('@editorjs/header'),
//     config: {
//       placeholder: 'Enter a header',
//       levels: [1, 2, 3, 4],
//       defaultLevel: 3
//     }
//   },
//   list: {
//     class: await import('@editorjs/list'),
//     inlineToolbar: true,
//   },
//   inlineCode: await import('@editorjs/inline-code'),
//   quote: await import('@editorjs/quote'),
//   warning: await import('@editorjs/warning'),
//   table: {
//     class: await import('@editorjs/table'),
//     inlineToolbar: true,
//   },
// };

// const validateEditorData = (data: any): EditorData => {
//   if (!data) {
//     return {
//       time: Date.now(),
//       blocks: [],
//       version: '2.28.2'
//     };
//   }

//   // Ensure each block has required properties
//   const validBlocks = (data.blocks || []).map((block: any) => ({
//     id: block.id || String(Date.now()),
//     type: block.type || 'paragraph',
//     data: {
//       text: block.data?.text || '',
//       ...(block.data || {})
//     }
//   }));

//   return {
//     time: data.time || Date.now(),
//     blocks: validBlocks,
//     version: data.version || '2.28.2'
//   };
// };

// export const useEditor = () => {
//   const [isMounted, setIsMounted] = useState(false);
//   const { editorData, setEditorData } = useCreateEmailStore();
//   const editorRef = useRef<EditorJS | null>(null);
//   const initializationRef = useRef(false);

//   const safeEditorData = validateEditorData(editorData);

//   const initializeEditor = useCallback(async () => {
//     if (initializationRef.current) return;

//     try {
//       if (!editorRef.current) {
//         const editor = new EditorJS({
//           holder: 'editorjs',
//           tools: EDITOR_JS_TOOLS,
//           data: safeEditorData,
//           onChange: async (api) => {
//             try {
//               const savedData = await api.saver.save();
//               const validatedData = validateEditorData(savedData);
//               setEditorData(validatedData);
//             } catch (error) {
//               console.error('Error saving editor data:', error);
//             }
//           },
//           autofocus: true,
//           placeholder: 'Start typing your email...',
//         });

//         await editor.isReady;
//         editorRef.current = editor;
//         initializationRef.current = true;
//       }
//     } catch (error) {
//       console.error('Error initializing editor:', error);
//     }
//   }, [setEditorData, safeEditorData]);

//   const saveEditor = async (): Promise<OutputData | undefined> => {
//     if (editorRef.current) {
//       try {
//         const savedData = await editorRef.current.save();
//         return validateEditorData(savedData);
//       } catch (error) {
//         console.error('Error saving editor:', error);
//       }
//     }
//   };

//   const destroyEditor = () => {
//     if (editorRef.current) {
//       editorRef.current.destroy();
//       editorRef.current = null;
//       initializationRef.current = false;
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setIsMounted(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       initializeEditor();
//       return () => {
//         destroyEditor();
//       };
//     }
//   }, [isMounted, initializeEditor]);

//   return {
//     saveEditor,
//     destroyEditor,
//     isMounted,
//   };
// };