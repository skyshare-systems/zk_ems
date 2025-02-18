export const EmailSection = ({ content }: { content: string }) => (
  <div className="rounded-lg  w-full  border border-white/[.08] text-center">
    <div
      className="prose max-w-[640px] mx-auto p-0"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  </div>
);
