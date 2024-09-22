import { testContext } from '../../../../../fixtures/context';
import { Address, OutputOwners } from '../../../../../serializable';
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

export const getInitialReducerState = (
  state: Partial<SpendReducerState> = {},
): SpendReducerState => ({
  excessAVAX: 0n,
  initialComplexity: createDimensions(1, 1, 1, 1),
  fromAddresses: [CHANGE_ADDRESS],
  ownerOverride: null,
  spendOptions: defaultSpendOptions(
    state?.fromAddresses?.map((address) => address.toBytes()) ?? [
      CHANGE_ADDRESS.toBytes(),
    ],
  ),
  toBurn: new Map(),
  toStake: new Map(),
  utxos: [],
  ...state,
});

export const getSpendHelper = ({
  initialComplexity = createDimensions(1, 1, 1, 1),
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
    gasPrice: testContext.gasPrice,
    initialComplexity,
    inputs: [],
    shouldConsolidateOutputs,
    stakeOutputs: [],
    toBurn,
    toStake,
    weights: testContext.complexityWeights,
  });
};
