import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // YouTube 카테고리 데이터
  const categories = [
    {
      category_id: "1",
      name_ko: "영화/애니메이션",
      name_en: "Film & Animation",
    },
    {
      category_id: "2",
      name_ko: "자동차",
      name_en: "Autos & Vehicles",
    },
    {
      category_id: "10",
      name_ko: "음악",
      name_en: "Music",
    },
    {
      category_id: "15",
      name_ko: "반려동물/동물",
      name_en: "Pets & Animals",
    },
    {
      category_id: "17",
      name_ko: "스포츠",
      name_en: "Sports",
    },
    {
      category_id: "18",
      name_ko: "단편 영화",
      name_en: "Short Movies",
    },
    {
      category_id: "19",
      name_ko: "여행/이벤트",
      name_en: "Travel & Events",
    },
    {
      category_id: "20",
      name_ko: "게임",
      name_en: "Gaming",
    },
    {
      category_id: "21",
      name_ko: "동영상 블로그",
      name_en: "Videoblogging",
    },
    {
      category_id: "22",
      name_ko: "인물/블로그",
      name_en: "People & Blogs",
    },
    {
      category_id: "23",
      name_ko: "코미디",
      name_en: "Comedy",
    },
    {
      category_id: "24",
      name_ko: "엔터테인먼트",
      name_en: "Entertainment",
    },
    {
      category_id: "25",
      name_ko: "뉴스/정치",
      name_en: "News & Politics",
    },
    {
      category_id: "26",
      name_ko: "노하우/스타일",
      name_en: "Howto & Style",
    },
    {
      category_id: "27",
      name_ko: "교육",
      name_en: "Education",
    },
    {
      category_id: "28",
      name_ko: "과학기술",
      name_en: "Science & Technology",
    },
    {
      category_id: "29",
      name_ko: "비영리/사회운동",
      name_en: "Nonprofits & Activism",
    },
    {
      category_id: "30",
      name_ko: "영화",
      name_en: "Movies",
    },
    {
      category_id: "31",
      name_ko: "애니메/애니메이션",
      name_en: "Anime/Animation",
    },
    {
      category_id: "32",
      name_ko: "액션/모험",
      name_en: "Action/Adventure",
    },
    {
      category_id: "33",
      name_ko: "고전",
      name_en: "Classics",
    },
    {
      category_id: "34",
      name_ko: "코미디",
      name_en: "Comedy",
    },
    {
      category_id: "35",
      name_ko: "다큐멘터리",
      name_en: "Documentary",
    },
    {
      category_id: "36",
      name_ko: "드라마",
      name_en: "Drama",
    },
    {
      category_id: "37",
      name_ko: "가족",
      name_en: "Family",
    },
    {
      category_id: "38",
      name_ko: "외국",
      name_en: "Foreign",
    },
    {
      category_id: "39",
      name_ko: "공포",
      name_en: "Horror",
    },
    {
      category_id: "40",
      name_ko: "SF/판타지",
      name_en: "Sci-Fi/Fantasy",
    },
    {
      category_id: "41",
      name_ko: "스릴러",
      name_en: "Thriller",
    },
    {
      category_id: "42",
      name_ko: "단편",
      name_en: "Shorts",
    },
    {
      category_id: "43",
      name_ko: "프로그램",
      name_en: "Shows",
    },
    {
      category_id: "44",
      name_ko: "예고편",
      name_en: "Trailers",
    },
  ];

  // 각 카테고리를 upsert (이미 있으면 업데이트, 없으면 생성)
  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { category_id: category.category_id },
      update: {
        name_en: category.name_en,
        name_ko: category.name_ko,
      },
      create: {
        category_id: category.category_id,
        name_en: category.name_en,
        name_ko: category.name_ko,
      },
    });
    console.log(`✅ Category ${result.category_id}: ${result.name_ko}`);
  }

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
