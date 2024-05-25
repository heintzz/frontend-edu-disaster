import React from 'react';

const SkeletonTable = () => {
  const headers = [
    { text: 'Nama Guru', width: '1/4' },
    { text: 'Kelas', width: '1/6' },
    { text: 'Email', width: '1/4' },
    { text: 'Status', width: '1/6' },
    { text: 'Aksi', width: '1/6' },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex gap-4 items-center rounded-md bg-gray-200 p-3 animate-pulse"></div>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center py-[2vh] pl-3 bg-gray-200 rounded-t-md">
          {headers.map((header) => (
            <div key={header.text} className={`w-${header.width} flex items-center`}>
              <div className="h-4 bg-gray-300 rounded animate-pulse w-full"></div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`w-full flex items-center py-[2vh] pl-3 ${
                index % 2 === 1 ? 'bg-gray-200' : ''
              }`}
            >
              <div className="w-1/4 flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
              </div>
              <div className="w-1/6 flex items-center gap-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-16"></div>
              </div>
              <div className="w-1/4 flex items-center gap-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
              </div>
              <div className="w-1/6 flex items-center gap-4">
                <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
              </div>
              <div className="w-1/6 flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
