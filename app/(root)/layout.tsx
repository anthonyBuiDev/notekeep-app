export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <div>
          <ul>
            <li>Notes</li>
            <li>Label</li>
            <li>Trash</li>
          </ul>
        </div>
      </div>
      <div className="w-full p-6  md:overflow-y-auto md:px-6 md:py-12">
        {children}
      </div>
    </div>
  );
}
