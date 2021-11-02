export async function deleteCodeByUserId(userId: number): Promise<void> {
  await this.codeRepository.destroy({ where: { userId } });
}
