import React, { useState } from "react";

const Lnb = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open LNB</button>
      {isOpen && (
        <div className="lnb-overlay" onClick={() => setIsOpen(false)}>
          <div className="lnb" onClick={(e) => e.stopPropagation()}>
            {/* LNB 내용 */}
            <p>LNB 내용이 여기에 들어갑니다.</p>
            <button onClick={() => setIsOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Lnb;
