import {expect, test} from '@oclif/test'

describe('AggregatedGenerationPerType', () => {
  test
  .stdout()
  .command(['AggregatedGenerationPerType'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['AggregatedGenerationPerType', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
