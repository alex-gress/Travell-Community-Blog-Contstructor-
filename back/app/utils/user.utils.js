export const userRegistrationFields = {
  id: true,
  name: true,
  email: true,
}

export const userProfileFields = {
  id: true,
  name: true,
  email: true,

  image:true,
  bio: true,
  posts: {
      select: {
        title: true,
        slug: true,
        text: true,
        category: true,
        filenameImage: true,
        updatedAt: true,
      }
  },

  createdAt:true,
  updatedAt: true,
}