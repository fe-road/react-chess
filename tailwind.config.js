const rowStartSafeList = [];
const columnStartSafeList = [];
for (let i = 1; i <= 8; i++) {
    rowStartSafeList.push(`row-start-${i}`);
    columnStartSafeList.push(`col-start-${i}`);
}

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [...rowStartSafeList, ...columnStartSafeList],
};
