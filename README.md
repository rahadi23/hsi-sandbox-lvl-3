# Level 3 Quiz

## User Story

Sebagai user saya ingin mencari sebuah artikel dan membacanya.

## Acceptance Criteria

1. Inisiasi source code menggunakan create-next-app.

1. Ikuti desain yang telah disediakan. Desain dapat diakses di https://www.figma.com/file/UANQAorcML15SDiv7eoXcr/Blog-(Community).

1. Gunakan API yang sudah disediakan di bawah ini

## API

### Article List API

API ini digunakan untuk mendapatkan list artikel

`GET` https://hsi-sandbox.vercel.app/api/articles

#### Parameters

|         Key         |       Data Type        |      Required/Optional      | Description                                                                 |
| :-----------------: | :--------------------: | :-------------------------: | --------------------------------------------------------------------------- |
|      `perPage`      |         number         |  optional<br>(default: 4)   | Cara menampilkan kumpulan artikel dalam _jumlah tertentu_ pada satu halaman |
|       `page`        |         number         |  optional<br>(default: 1)   | Cara menampilkan kumpulan artikel pada _halaman tertentu_                   |
|       `sort`        | enum<br>(new, popular) | optional<br>(default: new)  | Cara menampilkan kumpulan artikel dengan _urutan tertentu_                  |
|    `categoryId`     |         number         | optional<br>(default: null) | Cara menampilkan kumpulan artikel berdasarkan _kategori tertentu_           |
| `excludedArticleId` |         number         | optional<br>(default: null) | Cara menampilkan kumpulan artikel dengan mengecualikan _artikel tertentu_   |

#### Response Example

```json
{
  "meta": {
    "pagination": { "page": 1, "perPage": 4, "totalPages": 3 },
    "sort": "new",
    "categoryId": null,
    "excludedArticleId": null
  },
  "data": [
    {
      "id": 1,
      "category": { "id": 1, "name": "Tutorials" },
      "author": {
        "id": 1,
        "firstName": "Tomas",
        "middleName": "",
        "lastName": "Laurinavicius"
      },
      "thumbnail": "https://hsi-sandbox.vercel.app/image/how-to-use-google-adwords-for-your-business-beginners-guide.png",
      "slug": "how-to-use-google-adwords-for-your-business-beginners-guide",
      "title": "How to Use Google AdWords for Your Business (Beginner’s Guide)",
      "summary": "Learn how to use Google Ads to drive traffic and grow your business with this beginner's guide."
    },
    {
      "id": 2,
      "category": { "id": 1, "name": "Tutorials" },
      "author": {
        "id": 2,
        "firstName": "Daniel",
        "middleName": "K.",
        "lastName": "Hannah"
      },
      "thumbnail": "https://hsi-sandbox.vercel.app/image/website-downtime-applicable-tips-on-how-to-prevent-it.png",
      "slug": "website-downtime-applicable-tips-on-how-to-prevent-it",
      "title": "Website Downtime: Applicable Tips on How to Prevent It",
      "summary": "Minimize the risk of website downtime and ensure uptime by investing in reliable web hosting, regular updates, backup plans, and monitoring."
    },
    {
      "id": 3,
      "category": { "id": 1, "name": "Tutorials" },
      "author": {
        "id": 1,
        "firstName": "Tomas",
        "middleName": "",
        "lastName": "Laurinavicius"
      },
      "thumbnail": "https://hsi-sandbox.vercel.app/image/how-to-fix-error-404-not-found-on-your-wordpress-site.png",
      "slug": "how-to-fix-error-404-not-found-on-your-wordpress-site",
      "title": "How to Fix Error 404 Not Found on Your WordPress Site",
      "summary": "Learn how to fix the Error 404 Not Found on your WordPress site by updating permalinks, checking for broken links, restoring deleted pages, and using redirection plugins."
    },
    {
      "id": 4,
      "category": { "id": 1, "name": "Tutorials" },
      "author": {
        "id": 2,
        "firstName": "Daniel",
        "middleName": "K.",
        "lastName": "Hannah"
      },
      "thumbnail": "https://hsi-sandbox.vercel.app/image/how-to-migrate-from-wix-to-wordpress-complete-guide.png",
      "slug": "how-to-migrate-from-wix-to-wordpress-complete-guide",
      "title": "How to Migrate from Wix to WordPress (Complete Guide)",
      "summary": "Follow the steps to migrate from Wix to WordPress, including exporting content, setting up a new site, importing content, and redirecting your domain."
    }
  ]
}
```

### Article Detail API

API ini digunakan untuk mendapatkan detail artikel

`GET` https://hsi-sandbox.vercel.app/api/articles/:slug

#### Response Example

```json
{
  "data": {
    "id": 1,
    "category": { "id": 1, "name": "Tutorials" },
    "author": {
      "id": 1,
      "firstName": "Tomas",
      "middleName": "",
      "lastName": "Laurinavicius"
    },
    "thumbnail": "https://hsi-sandbox.vercel.app/image/how-to-use-google-adwords-for-your-business-beginners-guide.png",
    "slug": "how-to-use-google-adwords-for-your-business-beginners-guide",
    "title": "How to Use Google AdWords for Your Business (Beginner’s Guide)",
    "summary": "Learn how to use Google Ads to drive traffic and grow your business with this beginner's guide.",
    "content": "Google AdWords, now called Google Ads, is an advertising platform that can help businesses reach their target audience. This beginner's guide provides an overview of how to set up and run a successful AdWords campaign, covering topics such as keyword research, ad creation, budgeting, and performance tracking. By following the tips outlined in this guide, businesses can use AdWords to drive traffic to their website, increase conversions, and ultimately grow their business."
  }
}
```

## Home Page

1. Url untuk mengakses **Home Page** adalah `/`

1. Tampilkan 4 artikel yang terbaru saat user mengakses **Home Page** pertama kali atau mengklik tombol **New** (url berubah menjadi `/?sort=new` dan warna tombol **New** menjadi merah, sedangkan warna tombol **Popular** menjadi putih)

1. Tampilkan 4 artikel yang terpopuler saat user mengklik tombol **Popular** (url berubah menjadi `/?sort=popular` dan warna tombol **Popular** menjadi merah, sedangkan warna tombol **New** menjadi putih)

1. Artikel yang ditampilkan bertambah 4 setelah user mengklik tombol **Load More**

1. Tombol **Load More** menghilang saat tidak ada sisa artikel yang bisa ditambahkan

1. User diarahkan ke **Detail Page** setelah user mengklik judul dari salah satu artikel yang ditampilkan

### Technical Requirement

1. Gunakan _server-side rendering_ untuk menampilkan 4 artikel pertama, baik terurut berdasarkan yang terbaru maupun yang terpopuler

1. Gunakan _client-side data fetching_ untuk menambahkan 4 artikel setelah user mengklik tombol **Load More**

## Detail Page

1. Url untuk mengakses **Detail Page** adalah `/:slug`

1. Tampilkan **404 Page** jika **slug** tidak dikenal oleh **Article Detail API** (http status code sama dengan 404)

1. Tampilkan **Detail Page** jika **slug** dikenal oleh **Article Detail API** (http status code sama dengan 200)

1. **Detail Page** memiliki **Related Section** yang menampilkan list artikel yang memiliki kategori yang sama dengan kategori artikel dari **slug**

1. User diarahkan ke **Detail Page** setelah user mengklik judul dari salah satu artikel yang ditampilkan pada **Related Section**

1. User diarahkan ke **Related Page** setelah user mengklik tombol **More** pada **Related Section**

### Technical Requirement

1. Gunakan _static generation_ untuk menampilkan artikel

1. Gunakan _client-side data fetching_ untuk menampilkan list artikel yang memiliki kategori yang sama

## Related Page

1. Url untuk mengakses **Related Page** adalah `/:slug/related`

1. Tampilkan **404 Page** jika **slug** tidak dikenal oleh **Article Detail API** (http status code sama dengan 404)

1. Tampilkan **Related Page** jika **slug** dikenal oleh **Article Detail API** (http status code sama dengan 200)

1. Tampilkan 4 artikel yang memiliki kategori yang sama dengan kategori artikel dari **slug**

1. Artikel yang ditampilkan bertambah 4 setelah user mengklik tombol **Load More**

1. Tombol **Load More** menghilang saat tidak ada sisa artikel yang bisa ditambahkan

1. User diarahkan ke **Detail Page** setelah user mengklik judul dari salah satu artikel yang ditampilkan

### Technical Requirement

1. Gunakan _server-side rendering_ untuk menampilkan artikel dan 4 artikel yang memiliki kategori yang sama

1. Gunakan _client-side data fetching_ untuk menambahkan 4 artikel setelah user mengklik tombol **Load More**

## Submission

Silahkan kirimkan github link yang berisi source code dari website yang sudah dikerjakan ke https://forms.gle/tNq4zZTdZL7j1Eyx6. Lalu kirimkan juga video (yang menjelaskan bahwa sudah sesuai dg acceptance criteria) website yang sudah dikerjakan ke **#nxn-level3-quiz** atau **#nxt-level3-quiz**. Mohon kejujurannya untuk tidak melihat github peserta lain, semoga Allah menjaga kita untuk selalu bersikap jujur.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
