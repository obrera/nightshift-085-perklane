import { getCreateV1DiscriminatorBytes } from '@obrera/mpl-core-kit-lib'

export type MplCoreReadinessMetadata = {
  collectionPlan: string
  createV1Discriminator: string
  packageName: string
  status: string
}

export function getMplCoreReadinessMetadata(): MplCoreReadinessMetadata {
  return {
    collectionPlan: 'Issue one MPL Core loyalty pass asset per member wallet after server minting is added.',
    createV1Discriminator: bytesToHex(getCreateV1DiscriminatorBytes()),
    packageName: '@obrera/mpl-core-kit-lib',
    status: 'Receipts are wallet-signed now; no server mint is performed in this build.',
  }
}

function bytesToHex(bytes: ArrayLike<number>) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}
