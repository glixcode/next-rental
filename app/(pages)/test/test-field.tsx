import { useTestContext } from './test-context'

const TestField = () => {
  const count = useTestContext()

  return (
      <div>
          <label className="mb-1.5 block text-xs font-medium text-[#8c8c8c]">Test Label</label>
          <input
              type={"text"}
              value={count.state}
              onChange={(e) => count.setState(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#ededed] placeholder-[#555] outline-none transition-all duration-200 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
              placeholder={"Test Field"}
          />
      </div>
  )
}

export default TestField