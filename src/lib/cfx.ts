export type CfxUser = {
  user: {
    avatar_template: string
  }
}

export async function getCfxUser(username: string) {
  try {
    const response = await fetch(`https://forum.cfx.re/u/${username}.json`, {
      next: {
        revalidate: 60,
      },
    })
    const user = (await response.json()) as CfxUser
    return user
  } catch (e) {
    console.error(e)
  }
}

export function createProfilePictureUrl(user: CfxUser | null) {
  if (!user) return null

  const avatar = user.user.avatar_template.replace("{size}", "64")
  return avatar.startsWith("https") ? avatar : `https://forum.cfx.re${avatar}`
}
