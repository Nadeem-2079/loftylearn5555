export const GLOBAL_CSS = `

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Roboto+Mono:wght@400;500&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #0F0F0F;
  color: #F8F8F8;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection {
  background: #5DD62C;
  color: #0F0F0F;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #0F0F0F;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5DD62C;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  border: none;
  background: none;
}

input, select, textarea {
  font-family: 'Poppins', sans-serif;
}

/* Animations */

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes floatA {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes floatB {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(7px); }
}

@keyframes floatBadge {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes barGrow {
  from { width: 0; }
  to { width: var(--w); }
}

@keyframes pulse {
  0%,100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.5; }
}

@keyframes popIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes toastIn {
  from { transform: translateX(calc(100% + 24px)); }
  to { transform: translateX(0); }
}

@keyframes toastOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(calc(100% + 24px)); opacity: 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fu {
  animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
}

.fu-1 { animation-delay: 0.06s; }
.fu-2 { animation-delay: 0.12s; }
.fu-3 { animation-delay: 0.18s; }
.fu-4 { animation-delay: 0.26s; }

.card-hover {
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1),
              border-color 0.2s,
              box-shadow 0.4s;
}

.card-hover:hover {
  transform: translateY(-4px);
  border-color: rgba(93,214,44,0.25) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.6);
}

/* Mobile Visibility Generic */
.mob-show {
  display: none !important;
}

/* === MOBILE RESPONSIVE UTILITIES === */
@media (max-width: 768px) {
  /* Grids and Flexbox */
  .mob-col {
    flex-direction: column !important;
    align-items: stretch !important;
  }
  .mob-col-center {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
  
  /* Navigation */
  .mob-nav-hide {
    display: none !important;
  }
  .mob-hide {
    display: none !important;
  }
  .mob-show {
    display: flex !important;
  }
  .mob-nav-stack {
    flex-wrap: wrap !important;
    justify-content: center !important;
    padding: 12px !important;
  }
  
  /* Paddings and Margins */
  .mob-pad {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .mob-pad-y {
    padding-top: 40px !important;
    padding-bottom: 40px !important;
  }
  .mob-pad-y-lg {
    padding-top: 60px !important;
    padding-bottom: 60px !important;
  }
  
  /* Typography */
  .mob-text-hero {
    font-size: 36px !important;
    line-height: 1.2 !important;
  }
  .mob-text-h2 {
    font-size: 28px !important;
  }
  .mob-text-h3 {
    font-size: 22px !important;
  }
  .mob-text-p {
    font-size: 15px !important;
  }
  
  /* Specific Component Tweaks */
  .mob-3d-chip {
    transform: scale(0.6) !important;
    margin-top: -60px;
  }
}
`;