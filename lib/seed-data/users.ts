import bcrypt from "bcryptjs";

export async function getSeedUsers() {
  const hashedPassword = await bcrypt.hash("b2hSoruj80$$", 12);
  return [
    {
      name: "Soruj Mahmud",
      email: "sorujmahmudb2h@gmail.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
      twoFactorEnabled: false,
    },
  ];
}
