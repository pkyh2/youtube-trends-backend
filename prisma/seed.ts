import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // YouTube 카테고리 데이터
  const categories = [
    {
      categoryId: "1",
      name_ko: "영화/애니메이션",
      name_en: "Film & Animation",
    },
    {
      categoryId: "2",
      name_ko: "자동차",
      name_en: "Autos & Vehicles",
    },
    {
      categoryId: "10",
      name_ko: "음악",
      name_en: "Music",
    },
    {
      categoryId: "15",
      name_ko: "반려동물/동물",
      name_en: "Pets & Animals",
    },
    {
      categoryId: "17",
      name_ko: "스포츠",
      name_en: "Sports",
    },
    {
      categoryId: "18",
      name_ko: "단편 영화",
      name_en: "Short Movies",
    },
    {
      categoryId: "19",
      name_ko: "여행/이벤트",
      name_en: "Travel & Events",
    },
    {
      categoryId: "20",
      name_ko: "게임",
      name_en: "Gaming",
    },
    {
      categoryId: "21",
      name_ko: "동영상 블로그",
      name_en: "Videoblogging",
    },
    {
      categoryId: "22",
      name_ko: "인물/블로그",
      name_en: "People & Blogs",
    },
    {
      categoryId: "23",
      name_ko: "코미디",
      name_en: "Comedy",
    },
    {
      categoryId: "24",
      name_ko: "엔터테인먼트",
      name_en: "Entertainment",
    },
    {
      categoryId: "25",
      name_ko: "뉴스/정치",
      name_en: "News & Politics",
    },
    {
      categoryId: "26",
      name_ko: "노하우/스타일",
      name_en: "Howto & Style",
    },
    {
      categoryId: "27",
      name_ko: "교육",
      name_en: "Education",
    },
    {
      categoryId: "28",
      name_ko: "과학기술",
      name_en: "Science & Technology",
    },
    {
      categoryId: "29",
      name_ko: "비영리/사회운동",
      name_en: "Nonprofits & Activism",
    },
    {
      categoryId: "30",
      name_ko: "영화",
      name_en: "Movies",
    },
    {
      categoryId: "31",
      name_ko: "애니메/애니메이션",
      name_en: "Anime/Animation",
    },
    {
      categoryId: "32",
      name_ko: "액션/모험",
      name_en: "Action/Adventure",
    },
    {
      categoryId: "33",
      name_ko: "고전",
      name_en: "Classics",
    },
    {
      categoryId: "34",
      name_ko: "코미디",
      name_en: "Comedy",
    },
    {
      categoryId: "35",
      name_ko: "다큐멘터리",
      name_en: "Documentary",
    },
    {
      categoryId: "36",
      name_ko: "드라마",
      name_en: "Drama",
    },
    {
      categoryId: "37",
      name_ko: "가족",
      name_en: "Family",
    },
    {
      categoryId: "38",
      name_ko: "외국",
      name_en: "Foreign",
    },
    {
      categoryId: "39",
      name_ko: "공포",
      name_en: "Horror",
    },
    {
      categoryId: "40",
      name_ko: "SF/판타지",
      name_en: "Sci-Fi/Fantasy",
    },
    {
      categoryId: "41",
      name_ko: "스릴러",
      name_en: "Thriller",
    },
    {
      categoryId: "42",
      name_ko: "단편",
      name_en: "Shorts",
    },
    {
      categoryId: "43",
      name_ko: "프로그램",
      name_en: "Shows",
    },
    {
      categoryId: "44",
      name_ko: "예고편",
      name_en: "Trailers",
    },
  ];

  // 각 카테고리를 upsert (이미 있으면 업데이트, 없으면 생성)
  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { categoryId: category.categoryId },
      update: {
        name_en: category.name_en,
        name_ko: category.name_ko,
      },
      create: {
        categoryId: category.categoryId,
        name_en: category.name_en,
        name_ko: category.name_ko,
      },
    });
    console.log(`✅ Category ${result.categoryId}: ${result.name_ko}`);
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
