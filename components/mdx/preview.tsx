// import React from "react";
// import EditorJSParser from "editorjs-parser";
// import { useCreateEmailStore } from "@/store/create-email";

// const parser = new EditorJSParser();

// const EditorPreview: React.FC = () => {
//   const { editorData } = useCreateEmailStore();

//   if (!editorData?.blocks) {
//     return <p>No content available.</p>;
//   }

//   const htmlContent = parser.parse(editorData);

//   return (
//     <div className="prose p-4 border border-gray-200">
//       <h2 className="text-lg font-bold mb-2">Preview</h2>
//       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//     </div>
//   );
// };

// export default EditorPreview;
