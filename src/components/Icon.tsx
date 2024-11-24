import { AppMeta } from "./apps";

export default function Icon(props: {
    m: AppMeta,
    size: 'sm' | 'md' | 'lg'
}) {
    const className = {
        sm: 'w-10 h-0',
        md: 'w-12 h-12',
        lg: 'w-14 h-14'
    }[props.size];

    const icon = () => <props.m.icon class="w-full h-full" style={{
        padding: 'calc(0.15 * 100%)',
    }} />

    return <div class={"text-white border flex-none " + className}
        style={{
            'background-color': props.m.backgroundColor,
            'border-radius': 'calc(0.25 * 100%)',
        }}>
        {icon()}
    </div>
}