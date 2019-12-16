
export interface Point {
    readonly x: number;
    readonly y: number;
}

export type Direction = "L" | "R" | "U" | "D";

export class Segment {
    constructor(
        readonly start: Point,
        readonly length: number,
        readonly direction: Direction
    ) {}

    get end(): Point {
        switch (this.direction) {
            case "L":
                return {...this.start, x: this.start.x - this.length};
            case "R":
                return {...this.start, x: this.start.x + this.length};
            case "U":
                return {...this.start, y: this.start.y + this.length};
            case "D":
                return {...this.start, y: this.start.y - this.length};
        }
    }

    get horizontal(): boolean {
        return this.direction === "L" || this.direction === "R";
    }

    static fromString(start: Point, s: string): Segment {
        return new Segment(start, parseInt(s.substr(1)), s[0] as Direction);
    }
}

function intersectOrthogonal(h: Segment, v: Segment): Point | undefined {
    const minX = Math.min(h.start.x, h.end.x);
    const maxX = Math.max(h.start.x, h.end.x);

    const minY = Math.min(v.start.y, v.end.y);
    const maxY = Math.max(v.start.y, v.end.y);

    if (minX <= v.start.x && maxX >= v.start.x && minY <= h.start.y && maxY >= h.start.y) {
        return {
            x: v.start.x,
            y: h.start.y
        };
    }

    return undefined;
}

export function intersect(a: Segment, b: Segment): Point | undefined {
    if (a.horizontal && !b.horizontal) {
        return intersectOrthogonal(a, b);
    }

    if (b.horizontal && !a.horizontal) {
        return intersectOrthogonal(b, a);
    }

    // Let's assume co-linear segments never intersect at the corners.
    return undefined;
}

export function getIntersections(a: Segment[], b: Segment[]): Point[] {
    const result: Point[] = [];
    for (const segA of a) {
        for (const segB of b) {
            const p = intersect(segA, segB);
            if (p) {
                result.push(p);
            }
        }
    }

    return result;
}

export function getWire(encoded: string[]): Segment[] {
    let prevEnd: Point = {x: 0, y: 0};
    return encoded.reduce((acc, it) => {
        const next = Segment.fromString(prevEnd, it);
        prevEnd = next.end;
        return [...acc, next]
    }, [] as Segment[]);
}

export function getMinManhattanDistance(intersections: Point[]): number {
    const distances = intersections
        .map(it => Math.abs(it.x) + Math.abs(it.y))
        .filter(it => it > 0);
    return Math.min(...distances);
}
