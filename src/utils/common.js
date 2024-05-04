// export function formatPrice(price) {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(price);
// }

export default function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

