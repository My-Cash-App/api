export async function logout(phone: number): Promise<string> {
  const user = await this.userRepository.findOne({
    where: { phone: phone },
  });

  await this.tokenRepository.destroy({
    where: { userId: user.id },
  });

  return 'OK';
}
