import { testFeeConfig } from '../../../../../fixtures/feeConfig';
import { Address, OutputOwners } from '../../../../../serializable';
import type { SpendOptions } from '../../../../common';
import { defaultSpendOptions } from '../../../../common/defaultSpendOptions';
import { createDimensions } from '../../../../common/fees/dimensions';
import type { SpendHelperProps } from '../../spendHelper';
import { SpendHelper } from '../../spendHelper';
import type { SpendReducerState } from '../types';

export const CHANGE_ADDRESS = Address.fromString(
  'P-fuji1y50xa9363pn3d5gjhcz3ltp3fj6vq8x8a5txxg',
);
export const CHANGE_OWNERS: OutputOwners = OutputOwners.fromNative([
  CHANGE_ADDRESS.toBytes(),
]);

export const getInitialReducerState = ({
  spendOptions,
  ...state
}: Partial<Omit<SpendReducerState, 'spendOptions'>> & {
  spendOptions?: SpendOptions;
} = {}): SpendReducerState => ({
  excessAVAX: 0n,
  initialComplexity: createDimensions({
    bandwidth: 1,
    dbRead: 1,
    dbWrite: 1,
    compute: 1,
  }),
  fromAddresses: [CHANGE_ADDRESS],
  ownerOverride: null,
  spendOptions: defaultSpendOptions(
    state?.fromAddresses?.map((address) => address.toBytes()) ?? [
      CHANGE_ADDRESS.toBytes(),
    ],
    spendOptions,
  ),
  toBurn: new Map(),
  toStake: new Map(),
  utxos: [],
  feeConfig: testFeeConfig,
  ...state,
});

export const getSpendHelper = ({
  initialComplexity = createDimensions({
    bandwidth: 1,
    dbRead: 1,
    dbWrite: 1,
    compute: 1,
  }),
  shouldConsolidateOutputs = false,
  toBurn = new Map(),
  toStake = new Map(),
}: Partial<
  Pick<
    SpendHelperProps,
    'initialComplexity' | 'shouldConsolidateOutputs' | 'toBurn' | 'toStake'
  >
> = {}) => {
  return new SpendHelper({
    changeOutputs: [],
    initialComplexity,
    inputs: [],
    shouldConsolidateOutputs,
    stakeOutputs: [],
    toBurn,
    toStake,
    feeConfig: testFeeConfig,
  });
};
