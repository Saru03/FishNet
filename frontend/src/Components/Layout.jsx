import React from 'react';

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/Examples/src/assets/Journey through the Mariana Trench's azure depths in stunning 8K.jpg')",
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        backgroundBlendMode: 'overlay'
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
